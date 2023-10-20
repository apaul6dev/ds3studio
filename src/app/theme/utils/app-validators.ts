import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';

export function emailValidator(control: UntypedFormControl): {[key: string]: any} {
    var emailRegexp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/;    
    if (control.value && !emailRegexp.test(control.value)) {
        return {invalidEmail: true};
    }
    return { invalidEmail: false }
}

export function matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: UntypedFormGroup) => {
        let password= group.controls[passwordKey];
        let passwordConfirmation= group.controls[passwordConfirmationKey];
        if (password.value !== passwordConfirmation.value) {
            return passwordConfirmation.setErrors({mismatchedPasswords: true})
        }
    }
}

export function matchingEmail(emailKey: string, emailConfirmationKey: string) {
    return (group: UntypedFormGroup) => {
        let email = group.controls[emailKey];
        let emailConfirmation= group.controls[emailConfirmationKey];
        if (email.value !== emailConfirmation.value) {
            return emailConfirmation.setErrors({mismatchedEmail: true})
        }
    }
}