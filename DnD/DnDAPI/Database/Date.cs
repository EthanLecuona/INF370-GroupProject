using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Date")]
    public partial class Date
    {
        public Date()
        {
            DateTimeDriverVehicles = new HashSet<DateTimeDriverVehicle>();
        }

        [Key]
        [Column("ScheduleDate_ID")]
        public int ScheduleDateId { get; set; }
        [Column("Date", TypeName = "date")]
        public DateTime? Date1 { get; set; }

        [InverseProperty("ScheduleDate")]
        public virtual ICollection<DateTimeDriverVehicle> DateTimeDriverVehicles { get; set; }
    }
}
