using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Business.CCC.Jobs
{
    public class CronJobManager : ICronJobService
    {
        private readonly ILogger<CronJobManager> _logger;
        public CronJobManager(ILogger<CronJobManager> logger)
        {
            _logger = logger;
        }
        public void RunDailyLog()
        {
            _logger.LogInformation(
                "[CRONJOB][Daily] Job başladı → {Time}",
                DateTime.Now.ToString("dd.MM.yyyy HH:mm:ss"));

            try
            {
                // İş mantığı buraya gelecek
                _logger.LogInformation("[CRONJOB][Daily] İşlem başarıyla tamamlandı.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[CRONJOB][Daily] Hata oluştu!");
                throw;
            }
        }

        public void RunHourlyLog()
        {
            _logger.LogInformation(
                "[CRONJOB][Hourly] Job başladı → {Time}",
                DateTime.Now.ToString("dd.MM.yyyy HH:mm:ss"));

            try
            {
                _logger.LogInformation("[CRONJOB][Hourly] İşlem başarıyla tamamlandı.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "[CRONJOB][Hourly] Hata oluştu!");
                throw;
            }
        }
    }
}
