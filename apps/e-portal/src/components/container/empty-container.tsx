import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";

interface EmptyContainerProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}
const EmptyContainer = ({ title, description, icon }: EmptyContainerProps) => {
  return (
    <Empty className="border-1 border-gray-300 bg-transparent h-full">
      <EmptyHeader>
        <EmptyMedia
          variant="icon"
          className="bg-white shadow-sm ring-1 ring-gray-100 mb-4 animate-in fade-in zoom-in duration-500 rounded-2xl"
        >
          {icon}
        </EmptyMedia>
        <EmptyTitle className="font-sans text-secondary text-lg font-bold">
          {title}
        </EmptyTitle>
        <EmptyDescription className="font-sans text-gray-500 max-w-[200px] mx-auto text-xs">
          {description}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};

export default EmptyContainer;
