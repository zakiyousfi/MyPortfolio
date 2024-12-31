import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Globalconstant } from 'src/app/shared/global-constant';
import emailjs from '@emailjs/browser';
import { environment } from 'src/environments/environment';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Router } from '@angular/router';
import axios from 'axios'; // Install Axios via npm if not already installed

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

  onSubmit = async (): Promise<void> => {
    emailjs.init(this.key);
    const formData = this.contactForm.value;

    try {
      // Fetch user location via IP (replace API_KEY with your IP service key)
      const locationResponse = await axios.get(
        'https://ipinfo.io/json?token=ed88985f97a406'
      );

      const locationData = locationResponse.data;

      // Construct the email object with dynamic to_email
      const templateParams = {
        from_name: formData.name,           // User's name
        to_email: formData.email,           // Send email to the user's email address
        from_email: formData.email,         // Sender's email (user's email)
        to_name: formData.name,             // Receiver's name (user's name)
        subject: formData.subject,          // Subject entered by the user
        message: formData.message,          // Message entered by the user
        location: `${locationData.city}, ${locationData.region}, ${locationData.country}`, // Location info
      };

      // Send email to the user
      const response = await emailjs.send(this.serviceId, this.templateId, templateParams);

      this.snackbar.openSnackBar('Your message was sent successfully!', 'success');
      this.router.navigate(['/confirm']);
      this.contactForm.reset();
    } catch (error) {
      console.error('Error during form submission:', error);
      this.snackbar.openSnackBar('Failed to send your message. Try again later.', 'error');
    }
  };
}
