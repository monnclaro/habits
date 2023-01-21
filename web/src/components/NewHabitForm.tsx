import { Check } from "phosphor-react";

import * as Checkbox from "@radix-ui/react-checkbox";
import { FormEvent, useState } from "react";
import { api } from "../libs/axios";
import toast, { Toaster } from "react-hot-toast";

const availableWeekDays = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

const successNotification = () =>
  toast.success("Novo hábito criado!", {
    style: {
      borderRadius: "10px",
      background: "#18181b",
      color: "#fff",
    },
    iconTheme: {
      primary: "#7C3AED",
      secondary: "#FFFAEE",
    },
  });

export function NewHabitForm() {
  const [title, setTitle] = useState("");
  const [weekDays, setWeekDays] = useState<number[]>([]);

  async function createNewHabit(event: FormEvent) {
    event.preventDefault();

    if (!title || weekDays.length === 0) {
      return;
    }

    await api.post("habits", {
      title,
      weekDays,
    });

    setTitle("");
    setWeekDays([]);
    successNotification();
  }

  function handleToggleWeekDay(weekDay: number) {
    if (weekDays.includes(weekDay)) {
      const weekDaysWithRemovedOne = weekDays.filter((day) => day !== weekDay);
      setWeekDays(weekDaysWithRemovedOne);
    } else {
      const weekDaysWithAddedOne = [...weekDays, weekDay];
      setWeekDays(weekDaysWithAddedOne);
    }
  }

  return (
    <form onSubmit={createNewHabit} className="mt-6 flex w-full flex-col">
      <label htmlFor="title" className="font-semibold leading-tight">
        Qual seu compromentimento?
      </label>
      <input
        type="text"
        id="title"
        placeholder="ex.: Exercícios, dormir bem, etc..."
        autoFocus
        required
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className="mt-3 rounded-lg bg-zinc-800 p-4 text-white placeholder:text-zinc-400 focus:border-violet-600 focus:outline-none focus:ring-1 focus:ring-violet-600"
      />

      <label htmlFor="" className="mt-4 font-semibold leading-tight">
        Qual a recorrência?
      </label>

      <div className="mt-3 flex flex-col gap-2">
        {availableWeekDays.map((weekDay, index) => {
          return (
            <Checkbox.Root
              key={weekDay}
              className="group flex items-center gap-3 focus:outline-none"
              checked={weekDays.includes(index)}
              onCheckedChange={() => handleToggleWeekDay(index)}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-zinc-800 bg-zinc-900 transition-colors group-focus:outline-none group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 group-focus:ring-offset-zinc-900 group-data-[state=checked]:border-green-500 group-data-[state=checked]:bg-green-500">
                <Checkbox.Indicator>
                  <Check size={20} color="white" />
                </Checkbox.Indicator>
              </div>
              <span className="leading-tight text-white">{weekDay}</span>
            </Checkbox.Root>
          );
        })}
      </div>

      <button
        type="submit"
        className="mt-6 flex items-center justify-center gap-3 rounded-lg bg-green-600 p-4 font-semibold transition-colors hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        <Check size={20} weight="bold" />
        Confirmar
      </button>
    </form>
  );
}
