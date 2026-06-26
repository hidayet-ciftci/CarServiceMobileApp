using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.CrossCuttingConcerns.Logger
{
    public class ConsoleLogger : ILogger
    {
        public void Log()
        {
            Console.WriteLine("Console Loglandi");
        }
    }
}
