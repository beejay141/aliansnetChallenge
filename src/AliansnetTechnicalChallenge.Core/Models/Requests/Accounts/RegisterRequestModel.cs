using FluentValidation;

namespace AliansnetTechnicalChallenge.Core.Models.Requests
{
    public class RegisterRequestModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }

    }

    public class RegisterRequestModelValidator: AbstractValidator<RegisterRequestModel>
    {
        public RegisterRequestModelValidator()
        {
            RuleFor(x => x.FirstName).NotEmpty().WithMessage("Firstname is required");
            RuleFor(x => x.LastName).NotEmpty().WithMessage("Lastname is required");
            RuleFor(x => x.Username).NotEmpty().WithMessage("Username is required");
            RuleFor(x => x.Email).NotEmpty().WithMessage("email is required").EmailAddress().WithMessage("Kindly supply a valid email address");
            RuleFor(x => x.Password).NotEmpty().NotNull().WithMessage("Password is required").MinimumLength(6).WithMessage("Password must have minimum of 6 characters").Matches(@"\d").WithMessage("Password must have at least one digit.");
            RuleFor(x => x.ConfirmPassword).Equal(x => x.Password).WithMessage("Password does not match");
        }
    }

}
