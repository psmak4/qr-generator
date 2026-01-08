/**
 * Phone number formatting utilities
 * Formats phone numbers for display while preserving raw digits for QR codes
 */

/**
 * Extract only digits and leading + from a phone string
 */
export function extractPhoneDigits(phone: string): string {
  // Keep leading + for international numbers, then only digits
  const hasPlus = phone.startsWith('+');
  const digits = phone.replace(/\D/g, '');
  return hasPlus ? `+${digits}` : digits;
}

/**
 * Format a phone number for display
 * Supports US format and basic international format
 */
export function formatPhoneNumber(value: string): string {
  // Extract digits only (preserve leading +)
  const hasPlus = value.startsWith('+');
  const digits = value.replace(/\D/g, '');
  
  if (!digits) return hasPlus ? '+' : '';
  
  // US/Canada format: +1 (XXX) XXX-XXXX
  if (hasPlus && digits.startsWith('1') && digits.length <= 11) {
    const rest = digits.slice(1);
    
    if (rest.length === 0) return '+1';
    if (rest.length <= 3) return `+1 (${rest}`;
    if (rest.length <= 6) return `+1 (${rest.slice(0, 3)}) ${rest.slice(3)}`;
    return `+1 (${rest.slice(0, 3)}) ${rest.slice(3, 6)}-${rest.slice(6, 10)}`;
  }
  
  // US format without country code: (XXX) XXX-XXXX
  if (!hasPlus && digits.length <= 10) {
    if (digits.length <= 3) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  }
  
  // International format: +XX XXX XXX XXXX (groups of 3-4)
  if (hasPlus) {
    // Group digits: country code (1-3) + groups of 3-4
    let formatted = '+';
    let remaining = digits;
    
    // Country code (1-3 digits based on common patterns)
    const countryCodeLength = getCountryCodeLength(digits);
    formatted += remaining.slice(0, countryCodeLength);
    remaining = remaining.slice(countryCodeLength);
    
    // Add remaining digits in groups
    while (remaining.length > 0) {
      const groupSize = remaining.length > 4 ? 3 : remaining.length;
      formatted += ' ' + remaining.slice(0, groupSize);
      remaining = remaining.slice(groupSize);
    }
    
    return formatted;
  }
  
  // Fallback: just return with basic grouping
  let formatted = '';
  let remaining = digits;
  while (remaining.length > 0) {
    const groupSize = remaining.length > 4 ? 3 : remaining.length;
    formatted += (formatted ? ' ' : '') + remaining.slice(0, groupSize);
    remaining = remaining.slice(groupSize);
  }
  
  return formatted;
}

/**
 * Determine country code length based on common patterns
 */
function getCountryCodeLength(digits: string): number {
  // Single digit country codes: 1 (US/Canada), 7 (Russia/Kazakhstan)
  if (['1', '7'].includes(digits[0])) return 1;
  
  // Two digit country codes (most common): 20-69 range mostly
  const twoDigit = digits.slice(0, 2);
  const twoDigitCodes = [
    '20', '27', '30', '31', '32', '33', '34', '36', '39', '40', '41', '43', '44', '45', '46', '47', '48', '49',
    '51', '52', '53', '54', '55', '56', '57', '58', '60', '61', '62', '63', '64', '65', '66', '81', '82', '84',
    '86', '90', '91', '92', '93', '94', '95', '98'
  ];
  if (twoDigitCodes.includes(twoDigit)) return 2;
  
  // Default to 2 for unknown
  return Math.min(2, digits.length);
}

/**
 * Handle phone input change - formats as user types
 */
export function handlePhoneChange(
  newValue: string,
  currentValue: string,
  onChange: (value: string) => void
): void {
  // If user is deleting, allow it without reformatting
  if (newValue.length < currentValue.length) {
    // If they deleted a formatting character, also delete the previous digit
    const newDigits = newValue.replace(/\D/g, '');
    const currentDigits = currentValue.replace(/\D/g, '');
    
    if (newDigits === currentDigits && newDigits.length > 0) {
      // They only deleted formatting, so delete the last actual digit
      const hasPlus = newValue.startsWith('+') || currentValue.startsWith('+');
      const shortenedDigits = newDigits.slice(0, -1);
      onChange(formatPhoneNumber(hasPlus ? `+${shortenedDigits}` : shortenedDigits));
    } else {
      onChange(formatPhoneNumber(newValue));
    }
    return;
  }
  
  // Format the new value
  onChange(formatPhoneNumber(newValue));
}
