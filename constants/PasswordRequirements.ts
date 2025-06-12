export const PasswordRequired = [
    { 
        id: 1, 
        text: "1 capital character", 
        checked: false, 
        validate: (input: string) => /[A-Z]/.test(input) 
    },
    { 
        id: 2, 
        text: "At least 1 special character and 1 number", 
        checked: false, 
        validate: (input: string) => /[\d]/.test(input) && /[@$!%*?&]/.test(input) 
    },
    { 
        id: 3, 
        text: "Minimum of 10 characters", 
        checked: false, 
        validate: (input: string) => input.length < 10 && input.length > 0
    },
]

