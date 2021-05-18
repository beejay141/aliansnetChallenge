using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace AliansnetTechnicalChallenge.Infrastructure.Migrations
{
    public partial class add_created_At_to_appuser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "083d9a5f-1c70-4ec4-9809-73cdb25af96b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5194de20-077c-4a7c-9821-1d27e57382fb");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "AspNetUsers",
                type: "datetime2",
                nullable: false,
                defaultValueSql: "GETDATE()");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "DisplayName", "Name", "NormalizedName" },
                values: new object[] { "e7ecfc5f-6158-4434-948b-40cdc33d21a6", "7066799b-0320-43e7-8d94-d1b2dc58bb68", "Administrator", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "DisplayName", "Name", "NormalizedName" },
                values: new object[] { "69654d2a-66da-4fbf-8271-0da888552919", "3aa884c8-b53d-4524-b566-2ea1cc7ec277", "Worker", "Worker", "WORKER" });

            migrationBuilder.CreateIndex(
                name: "IX_Products_UserId_Name_RecordStatus",
                table: "Products",
                columns: new[] { "UserId", "Name", "RecordStatus" });

            migrationBuilder.CreateIndex(
                name: "IX_Products_UserId_RecordStatus",
                table: "Products",
                columns: new[] { "UserId", "RecordStatus" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Products_UserId_Name_RecordStatus",
                table: "Products");

            migrationBuilder.DropIndex(
                name: "IX_Products_UserId_RecordStatus",
                table: "Products");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "69654d2a-66da-4fbf-8271-0da888552919");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "e7ecfc5f-6158-4434-948b-40cdc33d21a6");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "DisplayName", "Name", "NormalizedName" },
                values: new object[] { "083d9a5f-1c70-4ec4-9809-73cdb25af96b", "eb85cc93-dffc-46c2-81cc-5261e2be4dc2", "Administrator", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "DisplayName", "Name", "NormalizedName" },
                values: new object[] { "5194de20-077c-4a7c-9821-1d27e57382fb", "aa3c16b4-f764-4683-8ab4-c65c3a57274a", "Worker", "Worker", "WORKER" });
        }
    }
}
