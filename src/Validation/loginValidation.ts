import type { ILogin } from "../Interface/Interface";

export const LoginValidation = (formData: ILogin, fieldName?: string) => {
    let errors: any = {};
    let valid: boolean = true;

    const validateField = (field: string) => {
        switch (field) {
            case "email":
                if (!formData.email.trim()) {
                    errors.email = "Email Address is Required.";
                    valid = false;
                } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email.trim())) {
                    errors.email = "Please enter a valid Email Address.";
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
                    ];

                    const passwordErrors = passwordRegex
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
    } else {
        ["email", "password"].forEach(validateField);
    }

    return { valid, errors };
}