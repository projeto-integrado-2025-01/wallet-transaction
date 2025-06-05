export class QueueConsumeRequest {
    constructor(
      public readonly queue: string,
      public readonly onMessage: (message: unknown) => Promise<void>
    ) {}
  }
  