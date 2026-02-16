import { isErrorWithMessage } from "$lib/types/typeGuard";

export function getErrorMessage(error: unknown): string {
    if (isErrorWithMessage(error)) {
      return error.message;
    }
  
    if (error instanceof Error) {
      return error.message;
    }
  
    return "Same error occurred";
  }


  
	export function formatDate(dateString: string): string {
		return new Intl.DateTimeFormat('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		}).format(new Date(dateString));
	}
