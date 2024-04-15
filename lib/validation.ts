import * as z from 'zod';

export const formschema = z.object({
	predicted_salary: z
		.number({
			required_error: 'Experience is required',
			invalid_type_error: 'Experience must be a number',
		})
		.min(1),
});

export type formData = z.infer<typeof formschema>;
