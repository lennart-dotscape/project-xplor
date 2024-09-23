<template>
	<ContentList path="/routes" v-slot="{ list }">
		<div class="container">
			<div class="grid grid-cols-12">
				<div class="col-span-12 lg:col-span-10 lg:col-start-2">
					<div class="py-12 md:py-24">
						<h2 class="heading-lg mb-8">Community made routes</h2>
						<div class="grid grid-cols-12 gap-y-8 md:gap-8">
							<div v-for="route in list" :key="route._path" class="col-span-12 md:col-span-6 lg:col-span-4">
								<RouteCard :data="route" :created="false" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</ContentList>
</template>
