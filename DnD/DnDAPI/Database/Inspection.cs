using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;
using Microsoft.EntityFrameworkCore;

#nullable enable
namespace DnDApi.Database
{
    [Table("Inspection")]
    public partial class Inspection
    {
        [Key]
        [Column("Inspection_ID")]
        public int InspectionId { get; set; }
        [Column("Start_Date", TypeName = "datetime")]
        public DateTime StartDate { get; set; }
        [Column("PreCar_Inspection")]
        [Unicode(false)]
        public string PreCarInspection { get; set; } 
        [Column("PreCar_Odometer")]
        public int PreCarOdometer { get; set; }
        [Column("PreCar_Tyres")]
        public bool PreCarTyres { get; set; }
        [Column("PreCar_Notes")]
        [StringLength(200)]
        [Unicode(false)]
        public string PreCarNotes { get; set; }
        [Column("End_Date", TypeName = "datetime")]
        public DateTime? EndDate { get; set; }
        [Column("PostCar_Inspection")]
        [Unicode(false)]
        public string? PostCarInspection { get; set; }
        [Column("PostCar_Odometer")]
        public int? PostCarOdometer { get; set; }
        [Column("PostCar_Tyres")]
        public bool? PostCarTyres { get; set; }
        [Column("PostCar_Notes")]
        [StringLength(200)]
        [Unicode(false)]
        public string? PostCarNotes { get; set; }
        [Column("DriverUser_ID")]
        [StringLength(900)]
        [Unicode(false)]
        public string DriverUserId { get; set; } 
    }
}
