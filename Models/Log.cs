using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Logara.Models
{
    public class Log
    {
        [Key]
        public int ID { get; set; }
        public DateTime START { get; set; }
        public DateTime STOP { get; set; }
        public string NOTE { get; set; }
    }
}