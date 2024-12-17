import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { database } from "@/db/database";
import { reservations as reservationSchema } from "@/db/schema";
import { revalidatePath } from "next/cache";

export default async function ExplorePage() {
  const reservations = await database.query.reservations.findMany();
  return (
    <main className=" container mx-auto py-12">
      <form
        action={async (formData: FormData) => {
          "use server";
          const reservation = formData.get("reservation") as string;
          await database.insert(reservationSchema).values({});
          revalidatePath("/");
        }}
      >
        <Input name="reservation" placeholder="Reservation" />
        <Button type="submit"> Place Reservation</Button>
      </form>

      {reservations.map((reservation) => (
        <div key={reservation.id}>{reservation.id}</div>
      ))}
    </main>
  );
}
