using Core.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Concrete
{
    public class Vehicle:IEntity
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public string Plate { get; set; }
        public string Brand { get; set; }
        public string Color { get; set; }
        public string VIN_Number { get; set; }
        public DateTimeOffset CreatedTime { get; set; }
    }
}
