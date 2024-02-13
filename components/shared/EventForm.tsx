'use client';
import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import * as z from 'zod';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { eventFormSchema } from '@/lib/validator';
import { eventDefaultValues } from '@/constants';
import Dropdown from './Dropdown';
import { Textarea } from '@/components/ui/textarea';
import FileUploader from './FileUploader';
import { ICategory } from '@/lib/database/models/category.model';
import Image from 'next/image';
import Location from '@/public/assets/icons/location-grey.svg';
import Calendar from '@/public/assets/icons/calendar.svg';
import Dollar from '@/public/assets/icons/dollar.svg';
import Link from '@/public/assets/icons/link.svg';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Checkbox } from '../ui/checkbox';
import { createCategory, getAllCategories } from '@/lib/actions/category.actions';
import { useUploadThing } from '@/lib/uploadthing';
import { handleError } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { createEvent } from '@/lib/actions/event.actions';
type Props = {
	userId: string;
	type: 'Create' | 'Update';
};

const EventForm = ({ userId, type }: Props) => {
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [newCategoryOption, setNewCategoryOption] = useState('');
	const router = useRouter();
	const [files, setFiles] = useState<File[]>([]);
	const initialValues = eventDefaultValues;
	const { startUpload } = useUploadThing('imageUploader');
	const form = useForm<z.infer<typeof eventFormSchema>>({
		resolver: zodResolver(eventFormSchema),
		defaultValues: initialValues,
	});

	async function onSubmit(values: z.infer<typeof eventFormSchema>) {
		let uploadedImageUrl = values.imageUrl;
		if (files.length > 0) {
			const uploadedImages = await startUpload(files);
			if (!uploadedImages) {
				return;
			}
			uploadedImageUrl = uploadedImages[0].url;
		}
		if (type === 'Create') {
			try {
				const newEvent = await createEvent({
					event: { ...values, imageUrl: uploadedImageUrl },
					userId,
					path: '/profile',
				});
				if (newEvent) {
					form.reset();
					router.push(`/events/${newEvent._id}`);
				}
			} catch (error) {
				handleError(error);
			}
		}
	}

	function applyNewCategory() {
		createCategory(newCategoryOption.trim()).then((result) => {
			setCategories((prev) => [...prev, result]);
		});
	}

	useEffect(() => {
		(async () => {
			const categoryList = await getAllCategories();
			categoryList && setCategories(categoryList as ICategory[]);
		})();
	}, []);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
				<div className="flex flex-col gap-5 md:flex-row">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<Input placeholder="Event title" {...field} className="input-field" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="categoryId"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<Dropdown
										onChangeHandler={field.onChange}
										value={field.value}
										placeholder="Category"
										options={categories}
										alertDialogTitle="New Category"
										isAlertDialogAccessible={true}
										isAlertDialogInput={true}
										alertDialogInputPlaceholder="Category name"
										alertDialogChangeHandler={(value) => setNewCategoryOption(value)}
										alertDialogCancelHandler={() => setNewCategoryOption('')}
										alertDialogApplyHandler={applyNewCategory}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex flex-col gap-5 md:flex-row">
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl className="h-72">
									<Textarea placeholder="Description" {...field} className="textarea rounded-2xl" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="imageUrl"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl className="h-72">
									<FileUploader
										onFieldChange={field.onChange}
										imageUrl={field.value}
										setFiles={setFiles}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex flex-col gap-5 md:flex-row">
					<FormField
						control={form.control}
						name="location"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl className="h-72">
									<div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
										<Image src={Location} alt="calendar" width={24} height={24} />
										<Input placeholder="Event location" {...field} className="input-field" />
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex flex-col gap-5 md:flex-row">
					<FormField
						control={form.control}
						name="startDateTime"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl className="h-72">
									<div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
										<Image
											src={Calendar}
											alt="calendar"
											width={24}
											height={24}
											className="filter-grey"
										/>
										<p className="ml-3 whitespace-nowrap text-gray-600">Start Date:</p>
										<DatePicker
											selected={field.value}
											onChange={(date: Date) => field.onChange(date)}
											showTimeSelect
											timeInputLabel="Time:"
											dateFormat="MM/dd/yyyy h:mm aa"
											wrapperClassName="datePicker"
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="endDateTime"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl className="h-72">
									<div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
										<Image
											src={Calendar}
											alt="calendar"
											width={24}
											height={24}
											className="filter-grey"
										/>
										<p className="ml-3 whitespace-nowrap text-gray-600">End Date:</p>
										<DatePicker
											selected={field.value}
											onChange={(date: Date) => field.onChange(date)}
											showTimeSelect
											timeInputLabel="Time:"
											dateFormat="MM/dd/yyyy h:mm aa"
											wrapperClassName="datePicker"
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex flex-col gap-5 md:flex-row">
					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl className="h-72">
									<div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
										<Image
											src={Dollar}
											alt="dollar"
											width={24}
											height={24}
											className="filter-grey"
										/>
										<Input
											type="number"
											placeholder="price"
											{...field}
											className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-vixible:ring-0 focus-visible:ring-offset-0"
										/>
										<FormField
											control={form.control}
											name="isFree"
											render={({ field }) => (
												<FormItem>
													<FormControl className="h-72">
														<div className="flex flex-center">
															<label
																htmlFor="isfree"
																className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
																Free Ticket
															</label>
															<Checkbox
																id="isFree"
																className="mr-2 h-5 w-5 border-2 border-primary-500"
																onCheckedChange={field.onChange}
																checked={field.value}
															/>
														</div>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="url"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-gray-50 px-4 py-2">
										<Image src={Link} alt="link" width={24} height={24} />
										<Input placeholder="URL" {...field} className="input-field" />
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button
					type="submit"
					size="lg"
					disabled={form.formState.isSubmitting}
					className="button col-span-2 w-full">
					{form.formState.isSubmitting ? 'Submitting...' : `${type} Event`}
				</Button>
			</form>
		</Form>
	);
};

export default EventForm;
