using Core.Entities.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Concrete
{
    public class ServiceRecord : IEntity
    {
        public int Id { get; set; }
        public int VehicleId { get; set; }
        public int UserId { get; set; }
        public string? Description { get; set; }
        public string State { get; set; }
        public DateTimeOffset? PlannedEndDate { get; set; }
        public DateTimeOffset? EndDate { get; set; }
        public decimal? Price { get; set; }
        public DateTimeOffset CreatedTime { get; set; }

    }
}
