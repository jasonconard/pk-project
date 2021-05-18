import { BehaviorSubject, Observable, PartialObserver, Subject, Subscription } from 'rxjs';

export class SubjectHelper<T> {
  private state: Subject<T> = null;
  private subject: Observable<T> = null;
  private value: T = null;
  private subscriptions: Subscription[] = [];

  constructor(value?: T) {
    this.state = value ? new BehaviorSubject<T>(value) : new Subject<T>();
    this.value = value || null;
    this.subject = this.state.asObservable();
    this.subscriptions = [];
  }

  get(): T {
    return this.value;
  }

  subscribe(observerOrNext: ((value: T) => void),
            error?: (error: any) => void,
            complete?: () => void): Subscription {
    const subscription = this.subject.subscribe(observerOrNext, error, complete);
    this.subscriptions.push(subscription)
    return subscription;
  }

  next(value?: T) {
    this.value = value;
    this.state.next(value || null);
  }

  unsubscribe() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.subscriptions = [];

  }
}
