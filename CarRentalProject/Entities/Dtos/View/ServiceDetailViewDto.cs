using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Dtos.View
{
    public class ServiceDetailViewDto
    {
        public string FullName { get; set; }
        public string? PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Address { get; set; }
        public string Plate { get; set; } 
        public string Brand { get; set; }
        public string Color { get; set; }
        public string VIN_Number { get; set; }
        public string employer_Name { get; set; }
        public string Description { get; set; }
        public string State { get; set; }
        public decimal Price { get; set; }
        public DateTime PlannedEndDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime CreatedTime { get; set; }
    }
}
