import PredictorForm from '@/components/predictor/PredictorForm';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/shared/Navbar';

export default async function Index() {
	return (
		<main className='flex flex-col justify-center items-center min-h-screen'>
			<Navbar />

			<Separator className='w-[500px]' />

			{/* Form */}
			<div className='p-5'>
				<PredictorForm />
			</div>
		</main>
	);
}
