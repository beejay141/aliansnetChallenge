using FluentValidation;


namespace AliansnetTechnicalChallenge.Core.Models.Requests
{
    public class AddProductRequestModel
    {
        public string Name { get; set; }
        public decimal Price { get; set; }
    }

    public class AddProductRequestModelValidator : AbstractValidator<AddProductRequestModel>
    {
        public AddProductRequestModelValidator()
        {
            RuleFor(c => c.Name).NotEmpty().WithMessage("Product name is required");
            RuleFor(c => c.Price).GreaterThan(0).WithMessage("Product Price can not be less or equal to zero");
        }
    }
}
