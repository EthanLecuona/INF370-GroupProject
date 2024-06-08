using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Parcel")]
    public partial class Parcel
    {
        [Key]
        [Column("Parcel_ID")]
        public int ParcelId { get; set; }
        [Column("ParcelCon_ID")]
        public int ParcelConId { get; set; }
        [Column("ParcelPriority_ID")]
        public int ParcelPriorityId { get; set; }
        [Column("ParcelType_ID")]
        public int ParcelTypeId { get; set; }
        [Column("Booking_ID")]
        public int BookingId { get; set; }

        [ForeignKey("BookingId")]
        [InverseProperty("Parcels")]
        public virtual Booking Booking { get; set; } 
        [ForeignKey("ParcelConId")]
        [InverseProperty("Parcels")]
        public virtual ParcelConfidentiality ParcelCon { get; set; } 
        [ForeignKey("ParcelPriorityId")]
        [InverseProperty("Parcels")]
        public virtual ParcelPriority ParcelPriority { get; set; } 
        [ForeignKey("ParcelTypeId")]
        [InverseProperty("Parcels")]
        public virtual ParcelType ParcelType { get; set; } 
    }
}
