using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Time")]
    public partial class Time
    {
        public Time()
        {
            DateTimeDriverVehicles = new HashSet<DateTimeDriverVehicle>();
        }

        [Key]
        [Column("ScheduleTime_ID")]
        public int ScheduleTimeId { get; set; }
        [Column("Time")]
        [StringLength(20)]
        [Unicode(false)]
        public string Time1 { get; set; } 

        [InverseProperty("ScheduleTime")]
        public virtual ICollection<DateTimeDriverVehicle> DateTimeDriverVehicles { get; set; }
    }
}
