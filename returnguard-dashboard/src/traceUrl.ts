const SUBSCRIPTION_ID = import.meta.env.VITE_APPINSIGHTS_SUBSCRIPTION_ID;
const RESOURCE_GROUP = import.meta.env.VITE_APPINSIGHTS_RESOURCE_GROUP;
const RESOURCE_NAME = import.meta.env.VITE_APPINSIGHTS_RESOURCE_NAME;

export function buildTraceUrl(traceId: string): string {
  const resourceId = `/subscriptions/${SUBSCRIPTION_ID}/resourceGroups/${RESOURCE_GROUP}/providers/microsoft.insights/components/${RESOURCE_NAME}`;
  return `https://portal.azure.com/#view/AppInsightsExtension/DetailsV2Blade/ComponentId~/${encodeURIComponent(
    resourceId
  )}/OperationId/${encodeURIComponent(traceId)}`;
}
