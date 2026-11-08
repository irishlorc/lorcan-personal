import { useSite } from '../site';
import { CheckIcon, CopyIcon } from './ui';

/** Light "Copy email" button with confirmation feedback. */
export function CopyButton({ large }: { large?: boolean }) {
  const { copied, copyEmail } = useSite();
  return (
    <button
      type="button"
      onClick={copyEmail}
      aria-label={copied ? 'Email address copied' : 'Copy email address'}
      className={'btn btn--light' + (large ? ' btn--lg' : '')}
    >
      <span aria-live="polite">{copied ? 'Copied to clipboard' : 'Copy email'}</span>
      {copied ? <CheckIcon w={16} sw={1.9} /> : <CopyIcon w={16} sw={1.7} />}
    </button>
  );
}
