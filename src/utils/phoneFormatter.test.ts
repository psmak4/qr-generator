import { describe, it, expect, vi } from 'vitest';
import { extractPhoneDigits, formatPhoneNumber, handlePhoneChange } from './phoneFormatter';

describe('extractPhoneDigits', () => {
  it('should remove non-digit characters', () => {
    expect(extractPhoneDigits('(123) 456-7890')).toBe('1234567890');
    expect(extractPhoneDigits('123.456.7890')).toBe('1234567890');
    expect(extractPhoneDigits('123 456 7890')).toBe('1234567890');
  });

  it('should preserve leading +', () => {
    expect(extractPhoneDigits('+1 (123) 456-7890')).toBe('+11234567890');
    expect(extractPhoneDigits('+44 20 7123 4567')).toBe('+442071234567');
  });

  it('should handle empty strings', () => {
    expect(extractPhoneDigits('')).toBe('');
  });
});

describe('formatPhoneNumber', () => {
  it('should format US numbers correctly', () => {
    expect(formatPhoneNumber('1234567890')).toBe('(123) 456-7890');
    expect(formatPhoneNumber('123')).toBe('(123');
    expect(formatPhoneNumber('123456')).toBe('(123) 456');
    expect(formatPhoneNumber('+11234567890')).toBe('+1 (123) 456-7890');
  });

  it('should format international numbers with known codes', () => {
    // UK: +44 ...
    expect(formatPhoneNumber('+447911123456')).toBe('+44 791 112 3456');
  });

  it('should handle raw input gracefully', () => {
    expect(formatPhoneNumber('')).toBe('');
    expect(formatPhoneNumber('+')).toBe('+');
  });
});

describe('handlePhoneChange', () => {
  it('should call onChange with formatted value', () => {
    const onChange = vi.fn();
    handlePhoneChange('1234567890', '', onChange);
    expect(onChange).toHaveBeenCalledWith('(123) 456-7890');
  });

  it('should handle deletion of formatting chars gracefully', () => {
    const onChange = vi.fn();
    // User had (123) 456-7890 and backspaced the '-', resulting in (123) 4567890
    // The current value was (123) 456-7890.
    // Wait, the logic handles if new length < old length.
    
    // Simulating backspace on the space after area code:
    // Current: (123) 456
    // New: (123)456  (user deleted space) -> 123456
    // Logic: if newDigits === currentDigits, remove last digit.
    
    handlePhoneChange('(123)456', '(123) 456', onChange);
    // newDigits: 123456, currentDigits: 123456. Match.
    // Should remove last digit -> 12345.
    // Formatted: (123) 45
    expect(onChange).toHaveBeenCalledWith('(123) 45');
  });
});
