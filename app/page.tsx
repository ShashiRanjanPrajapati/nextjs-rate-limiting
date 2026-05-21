"use client";

import { useState } from "react";
import getUserData from "@/app/actions/get-user-data";

export default function Home() {
	const [response, setResponse] = useState<{ message: string } | null>(null);
	const [isLoading, setIsLoading] = useState(false);

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
		<div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
			<div className="text-center max-w-md w-full p-8 bg-white rounded-xl shadow-lg transition-all hover:shadow-xl">
				<h1 className="text-2xl font-bold text-gray-800 mb-6">
					User Data Portal
				</h1>

				<button
					onClick={handleClick}
					disabled={isLoading}
					className="bg-blue-500 px-6 py-3 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors duration-200 font-medium shadow-sm"
				>
					{isLoading ? (
						<span className="inline-flex items-center">
							<svg
								className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
							>
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
								></circle>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								></path>
							</svg>
							Loading...
						</span>
					) : (
						"Get User Data"
					)}
				</button>

				{response && (
					<div className="mt-6 bg-gray-50 p-5 rounded-lg border border-gray-200">
						<p className="text-gray-700">{response.message}</p>
					</div>
				)}
			</div>
		</div>
	);
}
