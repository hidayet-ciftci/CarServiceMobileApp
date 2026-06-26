using Core.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Dtos
{
    public class CustomerDetailDto : IDTOs
    {
        public int CustomerId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int VehicleId { get; set; }
        public string Brand { get; set; }
        public string Color { get; set; }
        public string Plate { get; set; }
        public string VIN_Number { get; set; }
    }
}
