// import { Component, signal, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.html',
//   standalone: false,
//   styleUrl: './app.css'
// })
// export class App implements OnInit {
//   protected readonly title = signal('app');
//   isAuthenticated = signal(false); // flag de autenticação

//   ngOnInit(): void {
//     // @ts-ignore
//     google.accounts.id.initialize({
//       client_id: "1094836888613-1vr87ieepr6r4gdnjomj8j5m2j32ai86.apps.googleusercontent.com",
//       callback: this.handleCredentialResponse.bind(this),
//       auto_select: false,
//       cancel_on_tap_outside: true,

//     });
//     // @ts-ignore
//     google.accounts.id.renderButton(
//     // @ts-ignore
//     document.getElementById("google-button"),
//       { theme: "outline", size: "large", width: "100%" }
//     );
//     // @ts-ignore
//     google.accounts.id.prompt((notification: PromptMomentNotification) => {});
//   }

//   handleCredentialResponse() {
//     //console.log(response);
//     this.isAuthenticated.set(true);
// }
// }

import { Component, signal, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('app');
  isAuthenticated = signal(false); // flag de autenticação

  ngOnInit(): void {
    // @ts-ignore
     if (!window['google']) { 
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
       script.onload = () => this.initializeGoogleButton();
      document.head.appendChild(script);
     } else {
      this.initializeGoogleButton();
     }
    
  }

  initializeGoogleButton() {
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: "1094836888613-1vr87ieepr6r4gdnjomj8j5m2j32ai86.apps.googleusercontent.com",
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,
    });
    // @ts-ignore
    google.accounts.id.renderButton(
    // @ts-ignore
    document.getElementById("google-button"),
      { theme: "outline", size: "large", width: "100%" }
    );
    // @ts-ignore
    google.accounts.id.prompt((notification: PromptMomentNotification) => {});
  }

  handleCredentialResponse() {
    //console.log(response);
    this.isAuthenticated.set(true);
  }
}
