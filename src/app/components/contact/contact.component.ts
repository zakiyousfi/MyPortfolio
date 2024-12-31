import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Globalconstant } from 'src/app/shared/global-constant';
import emailjs from '@emailjs/browser';
import { environment } from 'src/environments/environment';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  responseMessage: any;
  key = environment.emailJSKey;
  serviceId = environment.mailService;
  templateId = environment.templateId;
  toMail: string = 'Zaki';

  contactForm: any = FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackbar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      name: [null, [Validators.pattern(Globalconstant.nameRegex)]],
      email: [null, [Validators.pattern(Globalconstant.emailRegex)]],
      subject: [null, [Validators.minLength(10)]],
      message: [null, [Validators.minLength(20)]],
    });
  }
  async fetchLocation(): Promise<any> {
    try {
      const response = await axios.get('http://ip-api.com/json/');
      return response.data; // Returns location data such as city, region, country, and IP.
    } catch (error) {
      console.error('Error fetching IP location:', error);
      return null;
    }
  }

  onSubmit = async (): Promise<void> => {
    emailjs.init(this.key);

    const formData = this.contactForm.value;

    // Fetch the user's location using their IP
    const locationData = await this.fetchLocation();
    let response = await emailjs.send(this.serviceId, this.templateId, {
      from_name: formData.name,
      to_name: this.toMail,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
    });
    this.router.navigate(['/confirm']);
    this.contactForm.reset();
  };
}
