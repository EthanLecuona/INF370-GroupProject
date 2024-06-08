using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DnDApi.Database
{
    [Table("Rating")]
    public partial class Rating
    {
        public Rating()
        {
            DriverRatings = new HashSet<DriverRating>();
        }

        [Key]
        [Column("Rating_ID")]
        public int RatingId { get; set; }
        [Column("Rating")]
        public double? Rating1 { get; set; }

        [InverseProperty("Rating")]
        public virtual ICollection<DriverRating> DriverRatings { get; set; }
    }
}
