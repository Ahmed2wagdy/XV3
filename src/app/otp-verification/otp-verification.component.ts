import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class OtpVerificationComponent implements OnInit {
  @ViewChild('digit1') digit1!: ElementRef;
  @ViewChild('digit2') digit2!: ElementRef;
  @ViewChild('digit3') digit3!: ElementRef;
  @ViewChild('digit4') digit4!: ElementRef;
  @ViewChild('digit5') digit5!: ElementRef;
  
  otpForm!: FormGroup;
  contact: string = '';
  otpError: string = '';
  countdown: number = 60;
  countdownSubscription?: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.otpForm = this.formBuilder.group({
      digit1: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      digit2: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      digit3: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      digit4: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      digit5: ['', [Validators.required, Validators.pattern('^[0-9]$')]]
    });

    this.route.queryParams.subscribe(params => {
      this.contact = params['contact'] || '';
    });

    this.startCountdown();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.digit1.nativeElement.focus();
    }, 0);
  }

  ngOnDestroy() {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

  startCountdown() {
    this.countdown = 60;
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
    
    this.countdownSubscription = interval(1000)
      .pipe(take(60))
      .subscribe(() => {
        this.countdown--;
        if (this.countdown === 0) {
          if (this.countdownSubscription) {
            this.countdownSubscription.unsubscribe();
          }
        }
      });
  }

  moveToNext(event: any, nextIndex: number) {
    const input = event.target;
    const value = input.value;
    
    if (value.length === 1) {
      // Move focus to the next input
      if (nextIndex > 0 && nextIndex <= 5) {
        const nextInput = this.getDigitElementByIndex(nextIndex);
        if (nextInput) {
          nextInput.nativeElement.focus();
        }
      }
    } else if (value.length === 0 && event.key === 'Backspace') {
      // Move focus to the previous input on backspace
      const prevIndex = nextIndex - 2;
      if (prevIndex >= 1 && prevIndex <= 5) {
        const prevInput = this.getDigitElementByIndex(prevIndex);
        if (prevInput) {
          prevInput.nativeElement.focus();
        }
      }
    }
  }
  
  getDigitElementByIndex(index: number): ElementRef | null {
    switch (index) {
      case 1: return this.digit1;
      case 2: return this.digit2;
      case 3: return this.digit3;
      case 4: return this.digit4;
      case 5: return this.digit5;
      default: return null;
    }
  }

  isOtpComplete(): boolean {
    const { digit1, digit2, digit3, digit4, digit5 } = this.otpForm.value;
    return !!digit1 && !!digit2 && !!digit3 && !!digit4 && !!digit5;
  }

  resendOtp() {
    if (this.countdown === 0) {
      // TODO: Implement actual resend OTP logic
      console.log('Resending OTP to', this.contact);
      this.startCountdown();
    }
  }

  onSubmit(): void {
    if (this.otpForm.invalid || !this.isOtpComplete()) {
      return;
    }

    const { digit1, digit2, digit3, digit4, digit5 } = this.otpForm.value;
    const otp = `${digit1}${digit2}${digit3}${digit4}${digit5}`;
    
    // TODO: Implement actual OTP verification
    console.log('Verifying OTP:', otp);
    
    // For demo purposes - navigate to reset password
    // In a real app, you would verify the OTP with the backend first
    this.router.navigate(['/reset-password'], { 
      queryParams: { contact: this.contact } 
    });
  }
}