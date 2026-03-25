import { act, fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { Button } from '../button/button';
import { ToastProvider, useToast } from './toast';

function ToastHarness() {
  const { dismiss, push } = useToast();

  return (
    <div>
      <Button
        onClick={() =>
          push({
            description: 'Saved to your workspace.',
            title: 'Changes saved',
            variant: 'success'
          })
        }
      >
        Push success
      </Button>
      <Button onClick={() => dismiss()}>Dismiss latest</Button>
    </div>
  );
}

describe('ToastProvider', () => {
  it('renders a pushed toast in the viewport', () => {
    render(
      <ToastProvider>
        <ToastHarness />
      </ToastProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Push success' }));

    expect(screen.getByRole('region', { name: 'Notifications' })).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Changes saved');
    expect(screen.getByText('Saved to your workspace.')).toBeInTheDocument();
  });

  it('dismisses the latest toast via the hook', () => {
    render(
      <ToastProvider>
        <ToastHarness />
      </ToastProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Push success' }));
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss latest' }));

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('auto dismisses a toast after its duration elapses', () => {
    vi.useFakeTimers();

    function AutoDismissHarness() {
      const { push } = useToast();

      return (
        <Button
          onClick={() =>
            push({
              duration: 20,
              title: 'Auto close',
              variant: 'info'
            })
          }
        >
          Push auto dismiss
        </Button>
      );
    }

    render(
      <ToastProvider>
        <AutoDismissHarness />
      </ToastProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Push auto dismiss' }));
    expect(screen.getByRole('status')).toHaveTextContent('Auto close');

    act(() => {
      vi.advanceTimersByTime(40);
    });

    expect(screen.queryByRole('status')).not.toBeInTheDocument();

    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it('renders error toasts as alerts and dismisses only the targeted toast', () => {
    function MultiToastHarness() {
      const { push } = useToast();

      return (
        <div>
          <Button
            onClick={() =>
              push({
                title: 'Info sync complete',
                variant: 'info',
              })
            }
          >
            Push info
          </Button>
          <Button
            onClick={() =>
              push({
                title: 'Publish failed',
                description: 'Retry after reviewing validation errors.',
                variant: 'error',
              })
            }
          >
            Push error
          </Button>
        </div>
      );
    }

    render(
      <ToastProvider>
        <MultiToastHarness />
      </ToastProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Push info' }));
    fireEvent.click(screen.getByRole('button', { name: 'Push error' }));

    expect(screen.getByRole('status', { name: 'Info sync complete' })).toBeInTheDocument();
    const alertToast = screen.getByRole('alert', { name: 'Publish failed' });
    expect(alertToast).toHaveTextContent('Retry after reviewing validation errors.');

    fireEvent.click(screen.getByRole('button', { name: 'Dismiss Publish failed' }));

    expect(screen.queryByRole('alert', { name: 'Publish failed' })).not.toBeInTheDocument();
    expect(screen.getByRole('status', { name: 'Info sync complete' })).toBeInTheDocument();
  });

  it('dismisses only the latest toast when dismiss is called without an id', () => {
    function MultiToastDismissHarness() {
      const { dismiss, push } = useToast();

      return (
        <div>
          <Button onClick={() => push({ title: 'First notice', variant: 'info' })}>Push first</Button>
          <Button onClick={() => push({ title: 'Second notice', variant: 'success' })}>Push second</Button>
          <Button onClick={() => dismiss()}>Dismiss latest</Button>
        </div>
      );
    }

    render(
      <ToastProvider>
        <MultiToastDismissHarness />
      </ToastProvider>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Push first' }));
    fireEvent.click(screen.getByRole('button', { name: 'Push second' }));
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss latest' }));

    expect(screen.getByRole('status', { name: 'First notice' })).toBeInTheDocument();
    expect(screen.queryByRole('status', { name: 'Second notice' })).not.toBeInTheDocument();
  });
});
