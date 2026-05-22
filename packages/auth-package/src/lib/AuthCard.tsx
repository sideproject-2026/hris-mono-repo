import type { FormEvent, ReactNode } from 'react';

export interface AuthCardProps {
  title: string;
  description?: string;
  primaryActionLabel: string;
  secondaryAction?: ReactNode;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  children?: ReactNode;
}

export function AuthCard({
  title,
  description,
  primaryActionLabel,
  secondaryAction,
  onSubmit,
  children
}: AuthCardProps) {
  return (
    <section className="auth-card">
      <header className="auth-card__header">
        <p className="auth-card__eyebrow">Auth package</p>
        <h1>{title}</h1>
        {description ? <p className="auth-card__description">{description}</p> : null}
      </header>

      <form className="auth-card__form" onSubmit={onSubmit}>
        <div className="auth-card__body">{children}</div>
        <button className="auth-card__submit" type="submit">
          {primaryActionLabel}
        </button>
      </form>

      {secondaryAction ? <footer className="auth-card__footer">{secondaryAction}</footer> : null}
    </section>
  );
}