using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Driver_Rating")]
    public partial class DriverRating
    {
        [Key]
        [Column("DriverRating_ID")]
        public int DriverRatingId { get; set; }
        [Column("Rating_ID")]
        public int RatingId { get; set; }
        [Column("DriverUser_ID")]
        [Unicode(false)]
        public string DriverUserId { get; set; } 
        [Column(TypeName = "datetime")]
        public DateTime? Date { get; set; }

        [ForeignKey("RatingId")]
        [InverseProperty("DriverRatings")]
        public virtual Rating Rating { get; set; } 
    }
}
