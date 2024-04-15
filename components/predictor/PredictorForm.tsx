'use client';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

import { formData, formschema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import Loading from '@/components/shared/Loading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { formatter } from '@/lib/utils';
import { useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';

const PredictorForm = () => {
	// init state
	const [isLoading, setIsLoading] = useState(false);
	const [responseData, setResponseData] = useState(null);

	// init form
	const form = useForm<formData>({
		resolver: zodResolver(formschema),
		defaultValues: {
			predicted_salary: 0,
		},
	});

	// handle submit
	const onSubmit = async (values: formData) => {
		try {
			setIsLoading(true);

			const res = await axios.post(
				`${process.env.NEXT_PUBLIC_API_DATA_URL}/predict`,
				values
			);

			toast.success('Salary predicted');
			setResponseData(res.data.prediction);
		} catch (error: any) {
			console.log(error);
			toast.error('Something went wrong!', error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='flex flex-col justify-center items-center max-w-[800px]'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-5 w-[500px]'
				>
					<div className='flex flex-col justify-center items-center'>
						<FormField
							control={form.control}
							name='predicted_salary'
							render={({ field }) => (
								<FormItem>
									<FormLabel className='font-bold text-md'>
										Enter years of experience
									</FormLabel>

									<FormControl>
										<Input
											type='number'
											placeholder='e.g. 12'
											disabled={isLoading}
											min={'0'}
											required
											{...field}
											onChange={(e) => field.onChange(parseInt(e.target.value))}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button
						disabled={isLoading}
						className='ml-[100px] mb-10 w-[300px] hover:bg-slate-700 hover:text-white'
						type='submit'
					>
						Predict
					</Button>
				</form>
			</Form>

			{isLoading && <Loading />}

			{responseData && (
				<span className='mt-3 font-bold text-lg'>
					{formatter.format(Number(responseData))}
				</span>
			)}
		</div>
	);
};

export default PredictorForm;
