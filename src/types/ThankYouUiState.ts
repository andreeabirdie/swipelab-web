export type ThankYouUiState =
    | { status: 'loading' }
    | { status: 'content'; experimentId: string }
    | { status: 'error' };