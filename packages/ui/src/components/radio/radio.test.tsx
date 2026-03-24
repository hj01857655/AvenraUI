import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Radio } from './radio';
import { FormField } from '../form-field/form-field';

describe('Radio', () => {
  it('renders label, hint, and invalid message accessibly', () => {
    render(
      <Radio
        id="contact-email"
        name="contact-method"
        value="email"
        label="Email"
        hint="Used for account updates"
        error="Choose a contact method"
      />,
    );

    const radio = screen.getByRole('radio', { name: 'Email' });
    const hint = screen.getByText('Used for account updates');
    const error = screen.getByText('Choose a contact method');

    expect(radio).toHaveAttribute('type', 'radio');
    expect(radio).toHaveAttribute('aria-invalid', 'true');
    expect(radio).toHaveAttribute('aria-describedby', `${hint.id} ${error.id}`);
  });

  it('wires the visible label to the native radio control', () => {
    render(
      <Radio id="contact-sms" name="contact-method" value="sms" label="SMS" />,
    );

    const radio = screen.getByLabelText('SMS');

    expect(radio).toHaveAttribute('id', 'contact-sms');
    expect(radio).toHaveAttribute('type', 'radio');
    expect(radio).toHaveAttribute('name', 'contact-method');
    expect(radio).toHaveAttribute('value', 'sms');
  });

  it('keeps aria-invalid false and omits an error id when valid', () => {
    render(
      <Radio
        id="contact-phone"
        name="contact-method"
        value="phone"
        label="Phone"
        hint="Best for urgent notifications"
      />,
    );

    const radio = screen.getByRole('radio', { name: 'Phone' });
    const hint = screen.getByText('Best for urgent notifications');

    expect(radio).toHaveAttribute('aria-invalid', 'false');
    expect(radio).toHaveAttribute('aria-describedby', hint.id);
    expect(screen.queryByText(/choose a contact method/i)).not.toBeInTheDocument();
  });

  it('omits aria-describedby when neither hint nor error is present', () => {
    render(
      <Radio id="contact-push" name="contact-method" value="push" label="Push" />,
    );

    const radio = screen.getByRole('radio', { name: 'Push' });

    expect(radio).not.toHaveAttribute('aria-describedby');
  });

  it('supports checked and defaultChecked semantics for a native radio', () => {
    render(
      <>
        <Radio
          id="contact-default-email"
          name="preferred-contact"
          value="email"
          label="Email"
          defaultChecked
        />
        <Radio
          id="contact-default-sms"
          name="preferred-contact"
          value="sms"
          label="SMS"
        />
      </>,
    );

    const emailRadio = screen.getByRole('radio', { name: 'Email' });
    const smsRadio = screen.getByRole('radio', { name: 'SMS' });

    expect(emailRadio).toBeChecked();
    expect(smsRadio).not.toBeChecked();

    fireEvent.click(smsRadio);

    expect(smsRadio).toBeChecked();
    expect(emailRadio).not.toBeChecked();
  });

  it('lets same-name radios behave as one native group', () => {
    render(
      <>
        <Radio id="shipping-standard" name="shipping" value="standard" label="Standard" />
        <Radio id="shipping-express" name="shipping" value="express" label="Express" />
        <Radio id="shipping-overnight" name="shipping" value="overnight" label="Overnight" />
      </>,
    );

    const standardRadio = screen.getByRole('radio', { name: 'Standard' });
    const expressRadio = screen.getByRole('radio', { name: 'Express' });
    const overnightRadio = screen.getByRole('radio', { name: 'Overnight' });

    fireEvent.click(expressRadio);
    expect(expressRadio).toBeChecked();
    expect(standardRadio).not.toBeChecked();
    expect(overnightRadio).not.toBeChecked();

    fireEvent.click(overnightRadio);
    expect(overnightRadio).toBeChecked();
    expect(expressRadio).not.toBeChecked();
    expect(standardRadio).not.toBeChecked();
  });

  it('renders hint and error through FormField control layout', () => {
    render(
      <FormField hint="Context hint" error="Context error" required layout="control">
        <Radio label="Email updates" name="updates" />
      </FormField>,
    );

    const radio = screen.getByRole('radio', { name: 'Email updates' });

    expect(radio).toHaveAttribute('required');
    expect(radio).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Context hint')).toBeInTheDocument();
    expect(screen.getByText('Context error')).toBeInTheDocument();
  });

  it('respects required and invalid when rendered without a field wrapper', () => {
    render(<Radio fieldWrapper={false} invalid label="Direct radio" name="direct" required />);

    const radio = screen.getByRole('radio', { name: 'Direct radio' });

    expect(radio).toHaveAttribute('required');
    expect(radio).toHaveAttribute('aria-invalid', 'true');
  });
});
