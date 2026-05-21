"use client";

import { useState } from "react";
import getUserData from "@/app/actions/get-user-data";

export default function Home() {
	const [response, setResponse] = useState<{ message: string } | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const isRateLimited = response?.message === "Too Many Requests";
	const hasError =
		response?.message === "Something went wrong!" || response?.message === "Too Many Requests";

	const handleClick = async () => {
		setIsLoading(true);
		try {
			const result = await getUserData();
			setResponse(result);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<main className="min-h-screen bg-[#f7f7f2] text-stone-950">
			<div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-6 sm:px-8 lg:px-10">
				<header className="flex items-center justify-between border-b border-stone-200 pb-5">
					<div className="flex items-center gap-3">
						<div className="grid size-10 place-items-center rounded-lg bg-emerald-950 text-white shadow-sm">
							<ShieldIcon />
						</div>
						<div>
							<p className="text-sm font-medium text-stone-500">Next.js Rate Limiter</p>
							<h1 className="text-xl font-semibold tracking-normal text-stone-950">
								User Data Portal
							</h1>
						</div>
					</div>
					<div className="hidden items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-800 sm:flex">
						<span className="size-2 rounded-full bg-emerald-500" />
						Memory limiter active
					</div>
				</header>

				<section className="grid flex-1 items-center gap-8 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-14">
					<div className="max-w-2xl">
						<p className="mb-4 inline-flex rounded-full border border-stone-300 bg-white px-3 py-1 text-sm font-medium text-stone-600 shadow-sm">
							4 requests per minute
						</p>
						<h2 className="text-4xl font-semibold tracking-normal text-stone-950 sm:text-5xl">
							Test protected server actions with a cleaner feedback loop.
						</h2>
						<p className="mt-5 max-w-xl text-base leading-7 text-stone-600 sm:text-lg">
							Trigger the action below to fetch user data. The interface reflects loading,
							success, and rate-limited states so the demo feels closer to a real product flow.
						</p>

						<div className="mt-8 grid gap-3 sm:grid-cols-3">
							<Stat label="Window" value="60s" />
							<Stat label="Budget" value="4 hits" />
							<Stat label="Cost" value="2 pts" />
						</div>
					</div>

					<div className="rounded-lg border border-stone-200 bg-white p-5 shadow-[0_24px_80px_rgba(28,25,23,0.10)] sm:p-6">
						<div className="flex items-start justify-between gap-4">
							<div>
								<p className="text-sm font-medium text-stone-500">Request Console</p>
								<h3 className="mt-1 text-2xl font-semibold text-stone-950">User endpoint</h3>
							</div>
							<div
								className={`rounded-full px-3 py-1 text-sm font-medium ${
									hasError
										? "bg-rose-50 text-rose-700 ring-1 ring-rose-200"
										: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
								}`}
							>
								{hasError ? "Attention" : "Ready"}
							</div>
						</div>

						<div className="mt-6 rounded-lg border border-stone-200 bg-stone-50 p-4">
							<div className="flex items-center justify-between gap-4">
								<div>
									<p className="text-sm font-medium text-stone-500">Server action</p>
									<p className="mt-1 font-mono text-sm text-stone-800">getUserData()</p>
								</div>
								<div className="grid size-10 place-items-center rounded-lg bg-white text-stone-700 ring-1 ring-stone-200">
									<ServerIcon />
								</div>
							</div>
						</div>

						<button
							onClick={handleClick}
							disabled={isLoading}
							className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-emerald-950 px-5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-emerald-900 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:bg-stone-400"
						>
							{isLoading ? (
								<>
									<SpinnerIcon />
									Checking quota
								</>
							) : (
								<>
									<ZapIcon />
									Get User Data
								</>
							)}
						</button>

						<div
							className={`mt-5 min-h-28 rounded-lg border p-4 transition ${
								response
									? isRateLimited
										? "border-rose-200 bg-rose-50"
										: "border-emerald-200 bg-emerald-50"
									: "border-dashed border-stone-300 bg-white"
							}`}
						>
							<p className="text-sm font-medium text-stone-500">Response</p>
							<p
								className={`mt-3 text-lg font-semibold ${
									response
										? isRateLimited
											? "text-rose-800"
											: "text-emerald-800"
										: "text-stone-500"
								}`}
							>
								{response?.message ?? "No request sent yet"}
							</p>
							<p className="mt-2 text-sm leading-6 text-stone-600">
								{isRateLimited
									? "The limiter rejected this request. Wait for the current window to reset."
									: response
										? "The protected action completed and returned data."
										: "Press the action button to call the protected endpoint."}
							</p>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
}

function Stat({ label, value }: { label: string; value: string }) {
	return (
		<div className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm">
			<p className="text-sm font-medium text-stone-500">{label}</p>
			<p className="mt-2 text-2xl font-semibold text-stone-950">{value}</p>
		</div>
	);
}

function ShieldIcon() {
	return (
		<svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
			<path
				d="M12 3.25 5.5 5.7v5.55c0 4.05 2.62 7.75 6.5 9.05 3.88-1.3 6.5-5 6.5-9.05V5.7L12 3.25Z"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinejoin="round"
			/>
			<path
				d="m9 12 2 2 4-4"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}

function ServerIcon() {
	return (
		<svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
			<rect x="4" y="5" width="16" height="6" rx="2" stroke="currentColor" strokeWidth="1.8" />
			<rect x="4" y="13" width="16" height="6" rx="2" stroke="currentColor" strokeWidth="1.8" />
			<path d="M8 8h.01M8 16h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
		</svg>
	);
}

function SpinnerIcon() {
	return (
		<svg aria-hidden="true" className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
			<circle className="opacity-25" cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="3" />
			<path
				className="opacity-90"
				d="M21 12a9 9 0 0 0-9-9"
				stroke="currentColor"
				strokeWidth="3"
				strokeLinecap="round"
			/>
		</svg>
	);
}

function ZapIcon() {
	return (
		<svg aria-hidden="true" className="size-4" viewBox="0 0 24 24" fill="none">
			<path
				d="M13 2 5 13h6l-1 9 9-13h-6l1-7Z"
				stroke="currentColor"
				strokeWidth="1.8"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
