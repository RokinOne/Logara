using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Logara.Models
{
    public class LogaraDBContext : DbContext
    {
        public DbSet<Log> log { get; set; }
    }
}
