using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DnDApi.Migrations
{
    public partial class Update10 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.DropColumn(
                name: "RecordedKM",
                table: "Maintenance");

            migrationBuilder.DropColumn(
                name: "TyrePressure",
                table: "Fuel_Price");

        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

            migrationBuilder.AddColumn<double>(
                name: "RecordedKM",
                table: "Maintenance",
                type: "float",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "TyrePressure",
                table: "Fuel_Price",
                type: "bit",
                nullable: true);

        }
    }
}
