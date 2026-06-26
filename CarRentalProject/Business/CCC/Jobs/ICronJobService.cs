using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.CCC.Jobs
{
    public interface ICronJobService
    {
        void RunDailyLog();
        void RunHourlyLog();
    }
}
