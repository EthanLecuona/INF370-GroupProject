using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Driver_Status")]
    public partial class DriverStatus
    {
        public DriverStatus()
        {
            DateTimeDriverVehicles = new HashSet<DateTimeDriverVehicle>();
        }

        [Key]
        [Column("DriverStatus_ID")]
        public int DriverStatusId { get; set; }
        public bool? Availability { get; set; }

        [InverseProperty("DriverStatus")]
        public virtual ICollection<DateTimeDriverVehicle> DateTimeDriverVehicles { get; set; }
    }
}
