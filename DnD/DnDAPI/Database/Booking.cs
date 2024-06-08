using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Booking")]
    public partial class Booking
    {
        public Booking()
        {
            BookingCancellations = new HashSet<BookingCancellation>();
            Comments = new HashSet<Comment>();
            DateTimeDriverVehicles = new HashSet<DateTimeDriverVehicle>();
            EventBookings = new HashSet<EventBooking>();
            Parcels = new HashSet<Parcel>();
            Trackings = new HashSet<Tracking>();
        }

        [Key]
        [Column("Booking_ID")]
        public int BookingId { get; set; }
        [Column("BookingStatus_ID")]
        public int BookingStatusId { get; set; }
        [Column("BookingType_ID")]
        public int BookingTypeId { get; set; }
        [Column("QRCode")]
        [Unicode(false)]
        public string Qrcode { get; set; } 
        public bool Canceled { get; set; }
        [Column("CEC_ID")]
        public int CecId { get; set; }
        [Column("SenderUser_ID")]
        [Unicode(false)]
        public string SenderUserId { get; set; } 
        [Required]
        public bool? Fined { get; set; }

        [ForeignKey("BookingStatusId")]
        [InverseProperty("Bookings")]
        public virtual BookingStatus BookingStatus { get; set; } 
        [ForeignKey("BookingTypeId")]
        [InverseProperty("Bookings")]
        public virtual BookingType BookingType { get; set; } 
        [ForeignKey("CecId")]
        [InverseProperty("Bookings")]
        public virtual ClientEmployeeConnection Cec { get; set; } 
        [InverseProperty("Booking")]
        public virtual ICollection<BookingCancellation> BookingCancellations { get; set; }
        [InverseProperty("Booking")]
        public virtual ICollection<Comment> Comments { get; set; }
        [InverseProperty("Booking")]
        public virtual ICollection<DateTimeDriverVehicle> DateTimeDriverVehicles { get; set; }
        [InverseProperty("Booking")]
        public virtual ICollection<EventBooking> EventBookings { get; set; }
        [InverseProperty("Booking")]
        public virtual ICollection<Parcel> Parcels { get; set; }
        [InverseProperty("Booking")]
        public virtual ICollection<Tracking> Trackings { get; set; }
    }
}
