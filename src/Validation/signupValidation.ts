import type { ISignup } from "../Interface/Interface";

export const SignupValidation = (formData: ISignup, fieldName?: string) => {
    let errors: any = {};
    let valid: boolean = true;

    const validateField = (field: string) => {
        switch (field) {
            case "name":
                if (!formData.name.trim()) {
                    errors.name = "User Name is Required.";
                    valid = false;
                } else if (!/^[a-zA-Z\s]*$/.test(formData.name.trim())) {
                    errors.name = "Please Enter Valid Name.";
                    valid = false;
                }
                break;

            case "mobile":
                if (!formData.mobile.trim()) {
                    errors.mobile = "Mobile Number is Required.";
                    valid = false;
                } else if (!/^(?!([0-9])\1{9})[1-9]\d{9}$/.test(formData.mobile.trim())) {
                    errors.mobile = "Please Enter a valid Mobile Number.";
                    valid = false;
                }
                break;

            case "email":
                if (!formData.email.trim()) {
                    errors.email = "Email Address is Required.";
                    valid = false;
                } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email.trim())) {
                    errors.email = "Please Enter a valid Email Adress.";
                    valid = false;
                }
                break;

            case "password":
                if (!formData.password.trim()) {
                    errors.password = "Password is Required.";
                    valid = false;
                } else {
                    const passwordRegex = [
                        { regex: /.{8,}/, message: "At least 8 characters" },
                        { regex: /\d/, message: "At least 1 digit" },
                        { regex: /[a-z]/, message: "At least 1 lowercase letter" },
                        { regex: /[!@#$%^&*]/, message: "At least 1 special character" },
                        { regex: /[A-Z]/, message: "At least 1 uppercase letter" },
                    ]; const passwordErrors = passwordRegex
                        .filter((rule) => !rule.regex.test(formData.password.trim()))
                        .map((rule) => rule.message);

                    if (passwordErrors.length > 0) {
                        errors.password = passwordErrors.join(", ");
                        valid = false;
                    }
                }
                break;
                
            default:
                break;
        }
    }

    if (fieldName) {
        validateField(fieldName);
    }

    return { valid, errors };


}