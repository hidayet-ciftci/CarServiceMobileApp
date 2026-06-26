using Entities.Concrete;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.ValidationRules.FluentValidation
{
    public class CustomerValidator : AbstractValidator<Customer>
    {
        public CustomerValidator()
        {
            RuleFor(c => c.Email).Must(Includes).WithMessage("Email Must have @ ");
            RuleFor(c => c.PhoneNumber).MinimumLength(5);
        }
        private bool Includes(string args)
        {
            if (args.Contains('@'))
            {
                return true;
            }
            else return false;
        }
    }
}
