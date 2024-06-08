using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Tracking")]
    public partial class Tracking
    {
        [Key]
        [Column("Tracking_ID")]
        public int TrackingId { get; set; }
        public double? Distance { get; set; }
        [Column("Start_Location")]
        [StringLength(200)]
        [Unicode(false)]
        public string StartLocation { get; set; }
        [Column("End_Location")]
        [StringLength(200)]
        [Unicode(false)]
        public string EndLocation { get; set; }
        [Column("Booking_ID")]
        public int BookingId { get; set; }

        [ForeignKey("BookingId")]
        [InverseProperty("Trackings")]
        public virtual Booking Booking { get; set; } 
    }
}
