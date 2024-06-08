using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Date_Time_Driver_Vehicle")]
    public partial class DateTimeDriverVehicle
    {
        [Key]
        [Column("DateTimeDriver_ID")]
        public int DateTimeDriverId { get; set; }
        [Column("ScheduleTime_ID")]
        public int ScheduleTimeId { get; set; }
        [Column("ScheduleDate_ID")]
        public int ScheduleDateId { get; set; }
        [Column("DriverUser_ID")]
        [Unicode(false)]
        public string DriverUserId { get; set; } 
        [Column("DriverStatus_ID")]
        public int DriverStatusId { get; set; }
        [Column("Booking_ID")]
        public int BookingId { get; set; }

        [ForeignKey("BookingId")]
        [InverseProperty("DateTimeDriverVehicles")]
        public virtual Booking Booking { get; set; } 
        [ForeignKey("DriverStatusId")]
        [InverseProperty("DateTimeDriverVehicles")]
        public virtual DriverStatus DriverStatus { get; set; } 
        [ForeignKey("ScheduleDateId")]
        [InverseProperty("DateTimeDriverVehicles")]
        public virtual Date ScheduleDate { get; set; } 
        [ForeignKey("ScheduleTimeId")]
        [InverseProperty("DateTimeDriverVehicles")]
        public virtual Time ScheduleTime { get; set; } 
    }
}
