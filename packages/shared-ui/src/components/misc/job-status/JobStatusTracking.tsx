import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useMemo } from "react";

import { checkJobStatusOption } from "./useJobStatusTracking";
import type { JobStatusResponse } from "./useJobStatusTracking";
import type { PropsWithChildren } from "react";
import { Button } from "@/components/ui/button";
import { useJobStatusStore } from "@/lib/stores/useJobStatusStore";
import { cn } from "@/lib/utils";

const POLL_INTERVAL_MS = 5000;
const TERMINAL_STATUSES = new Set([2, 3]);

type JobStatusTrackingContextState = {
  jobId?: string;
  jobStatus?: JobStatusResponse;
  isChecking: boolean;
  setJobId: (id?: string) => void;
  clearJobId: () => void;
  refetchStatus: () => void;
};

const JobStatusTrackingContext = createContext<JobStatusTrackingContextState | undefined>(
  undefined
);

const isTerminalStatus = (status?: number) =>
  status !== undefined && TERMINAL_STATUSES.has(status);

type StatusVariant = "idle" | "queued" | "processing" | "success" | "error";

const STATUS_META: Record<StatusVariant, { label: string; dot: string; container: string }> = {
  idle: {
    label: "Waiting for job…",
    dot: "bg-muted",
    container: "border-border bg-background/90",
  },
  queued: {
    label: "Queued",
    dot: "bg-amber-400",
    container: "border-amber-200 bg-amber-50/90",
  },
  processing: {
    label: "Processing",
    dot: "bg-sky-400",
    container: "border-sky-200 bg-sky-50/90",
  },
  success: {
    label: "Completed",
    dot: "bg-emerald-500",
    container: "border-emerald-200 bg-emerald-50/90",
  },
  error: {
    label: "Failed",
    dot: "bg-destructive",
    container: "border-destructive/40 bg-destructive/10",
  },
};

const getStatusVariant = (status?: number, hasError?: boolean): StatusVariant => {
  if (hasError) return "error";
  if (status === 0) return "queued";
  if (status === 1) return "processing";
  if (status === 2) return "success";
  if (status === 3) return "error";
  return "idle";
};

const formatJobLabel = (jobId: string) =>
  jobId.length > 12 ? `${jobId.slice(0, 6)}…${jobId.slice(-4)}` : jobId;

export const JobStatusTrackingProvider = ({ children }: PropsWithChildren) => {
  const jobId = useJobStatusStore((state) => state.jobId);
  const setJobId = useJobStatusStore((state) => state.setJobId);
  const clearJobId = useJobStatusStore((state) => state.clearJobId);

  const queryResult = useQuery({
    ...checkJobStatusOption(jobId),
    enabled: Boolean(jobId),
    refetchOnWindowFocus: false,
  });

  const { data: jobStatus, isPending, isFetching, error, refetch } = queryResult;

  const shouldPoll = Boolean(jobId) && !isTerminalStatus(jobStatus?.status);

  useEffect(() => {
    if (!shouldPoll) return;
    const intervalId = window.setInterval(() => {
      refetch();
    }, POLL_INTERVAL_MS);
    return () => window.clearInterval(intervalId);
  }, [shouldPoll, refetch]);

  const contextValue = useMemo<JobStatusTrackingContextState>(
    () => ({
      jobId,
      jobStatus,
      isChecking: isPending || isFetching,
      setJobId,
      clearJobId,
      refetchStatus: () => {
        void refetch();
      },
    }),
    [jobId, jobStatus, isPending, isFetching, setJobId, clearJobId, refetch]
  );

  return (
    <JobStatusTrackingContext.Provider value={contextValue}>
      {children}
      <JobStatusToast
        jobId={jobId}
        status={jobStatus}
        isChecking={isPending || isFetching}
        onClear={clearJobId}
        error={error}
      />
    </JobStatusTrackingContext.Provider>
  );
};

type JobStatusToastProps = {
  jobId?: string;
  status?: JobStatusResponse;
  isChecking: boolean;
  onClear: () => void;
  error: unknown;
};

const JobStatusToast = ({ jobId, status, isChecking, onClear, error }: JobStatusToastProps) => {
  if (!jobId) return null;

  const apiErrorMessage = status?.error || (error instanceof Error ? error.message : undefined);
  const variant = getStatusVariant(status?.status, Boolean(apiErrorMessage));
  const meta = STATUS_META[variant];

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 flex min-w-[260px] max-w-sm items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg backdrop-blur",
        meta.container
      )}
    >
      <span
        className={cn(
          "mt-1 inline-block h-2.5 w-2.5 rounded-full",
          meta.dot,
          isChecking && "animate-pulse"
        )}
      />
      <div className="flex-1 text-sm leading-tight">
        <p className="font-semibold text-foreground">
          Tracking job <span className="font-mono">{formatJobLabel(jobId)}</span>
        </p>
        <p className="text-xs text-muted-foreground">
          {isChecking ? "Checking latest status…" : meta.label}
        </p>
        {apiErrorMessage && (
          <p className="mt-1 text-xs text-destructive">{apiErrorMessage}</p>
        )}
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="h-7 px-2 text-xs"
        onClick={onClear}
      >
        Clear
      </Button>
    </div>
  );
};

export const useJobStatusTrackingContext = () => {
  const context = useContext(JobStatusTrackingContext);
  if (!context) {
    throw new Error(
      "useJobStatusTrackingContext must be used within a JobStatusTrackingProvider"
    );
  }
  return context;
};

export default JobStatusTrackingProvider;
