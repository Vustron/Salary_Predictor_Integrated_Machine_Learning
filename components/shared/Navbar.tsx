import { ModeToggle } from '@/components/shared/ModeToggle';

const Navbar = () => {
	return (
		<>
			<nav className='bg-transparent flex flex-row justify-center items-center py-4'>
				<ModeToggle />

				<h1 className='pl-3 font-bold text-3xl'>Salary Predictor</h1>
			</nav>
		</>
	);
};

export default Navbar;
